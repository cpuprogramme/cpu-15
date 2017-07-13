#!/bin/bash

scss -t compressed scripts/style.css style.css

java -jar /usr/share/java/closure-compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    --js scripts/interactions.js \
        --language_in ECMASCRIPT_2017 \
    --js_output_file interactions.js \
        --language_out ECMASCRIPT5_STRICT