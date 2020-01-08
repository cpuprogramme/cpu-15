#!/usr/bin/env python3

"""
Adapted from the lousy mp3chaps

Usage:
  mp3chaps_from_webvtt.py -h
  mp3chaps_from_webvtt.py (-l | -i | -r) <filename>

Options:
  -h  Show this help text
  -l  List chapters in <filename>
  -i  Import chapters from chapters/<filename>.vtt
  -r  Remove chapters from <filename>

"""
from eyed3.id3 import Tag
from docopt import docopt
import os
import re


expected_times = re.compile(r'^(?P<start>\d{2}:\d{2}:\d{2}.\d{3}) --> (?P<end>\d{2}:\d{2}:\d{2}.\d{3})$')
remove_html_tags = re.compile(r'(<[^>]+>)')


def list_chaps(tag):
    "list chapters in tag"
    print("Chapters:")
    for chap in tag.chapters:
        print(chap.sub_frames.get(b"TIT2")[0]._text)


def remove_chaps(tag):
    "remove all the chapters and save tag to file"
    chaps = [chap for chap in tag.chapters]
    for chap in chaps:
        print("removing {}".format(chap.sub_frames.get(b"TIT2")[0]._text))
        tag.chapters.remove(chap.element_id)
    tag.save()


def parse_chapters_file(fname):
    filename, ext = os.path.splitext(fname)
    chapters_fname = "tracks/{}.vtt".format(filename)
    chaps = []
    with open(chapters_fname, 'r+', encoding='utf8') as f:
        for line in f:
            match = expected_times.search(line)
            if match is not None:
                title = next(f)
                # supprimer les \n
                title = title.replace('\n', '')
                # puis supprimer les tags HTML
                title = remove_html_tags.sub('', title)
                # et les entities HTML
                title = title.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                infos = {
                    'start': to_millisecs(match.group('start')),
                    'end': to_millisecs(match.group('end')),
                    'title': title
                }
                chaps.append(infos)
                # print(infos)
    return chaps


def add_chapters(tag, fname):
    chaps = parse_chapters_file(fname)
    index = 0
    child_ids = []
    for chap in chaps:
        element_id = bytes("ch{}".format(index), 'latin-1')
        title = chap['title']
        new_chap = tag.chapters.set(element_id, (chap['start'], chap['end']))
        new_chap.sub_frames.setTextFrame(b"TIT2", title)
        child_ids.append(element_id)
        index += 1
    tag.table_of_contents.set(b"toc", child_ids=child_ids)
    list_chaps(tag)
    tag.save()


def to_millisecs(time):
    h, m, s = [float(x) for x in time.split(":")]
    return int(1000 * (s + m * 60 + h * 60 * 60))


def main():
    "Entry point"
    args = docopt(__doc__, version="mp3chaps 0.1")
    tag = Tag()
    tag.parse(args["<filename>"])
    if args["-l"]:
        list_chaps(tag)
    elif args["-i"]:
        add_chapters(tag, args["<filename>"])
    elif args["-r"]:
        remove_chaps(tag)


if __name__ == '__main__':
    main()

# first we will set chapters with element_id and times tuple (start, end)
# times are in milliseconds
# tag.chapters.set("ch1", (0,10000))
# tag.chapters.set("ch2", (10000, 360000))
# tag.chapters.set("ch3", (360000, 1800000))

# now we will set titles for each chapter
# chap1 = tag.chapters.get("ch1")
# chap1.sub_frames.setTextFrame("TIT2", u"Here is my first chapter title")
# chap2 = tag.chapters.get("ch2")
# chap2.sub_frames.setTextFrame("TIT2", u"Here is my second chapter title")
# chap3 = tag.chapters.get("ch3")
# chap3.sub_frames.setTextFrame("TIT2", u"Here is my third chapter title")

# don't forget to add chapters to the toc
# tag.table_of_contents.set("toc", child_ids=["ch1", "ch2", "ch3"])

# last but not least, save our tag
# tag.save()
