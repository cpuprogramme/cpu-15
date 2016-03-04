#!/bin/bash

# To run this script, you will need :
# - Google Closure (java environment)
# - myth.io (node.js environment)
# NEVER run this on your server !

# ECMASCRIPT5 ECMASCRIPT5_STRICT
# CLOSURE_OPTIONS=" --language_out ECMASCRIPT5 --jscomp_off internetExplorerChecks  --output_wrapper (function(document,window){%output%})(document,window); "
CLOSURE_OPTIONS=" --language_out ECMASCRIPT5 --jscomp_off internetExplorerChecks "

SOURCE="tpl/_head_assets.html"
PRODUCTION_DIR="production"
OUTPUT="$PRODUCTION_DIR/_head_assets.tpl.html"

echo " - Clean-up production"
    rm -rf production
    mkdir production

#populating with external non compressed styles and scripts
echo " - Pass-thru JS"
for JS in `grep '<script.*src.*\/script>' $SOURCE | grep -v '{{tpl:' | sed -r 's|(.*src=")(.*.js)(".*)|\2|'`
    do
        echo " -  - $JS"
        echo "<script type=\"text/javascript\" src=\"$JS\" async defer></script>" >> $OUTPUT
done
echo " - Pass-thru CSS"
for CSS in `grep '<link.*css".*/>' $SOURCE | grep -v '{{tpl:' | sed -r 's|(.*href=")(.*.css)(".*)|\2|'`
    do
        echo " -  - $CSS"
        echo "<link rel=\"stylesheet\" href=\"$CSS\" />" >> $OUTPUT
done

echo " - Listing reductable JS"
JS_SOURCE=""
for JS in `grep '<script.*src="{{tpl:BlogThemeURL}}/.*\/script>' $SOURCE | sed -r 's|(.*src=".*\{\{tpl:BlogThemeURL\}\}/)(.*.js)(".*)|\2|'`
    do
        echo " -  - $JS"
        JS_SOURCE="$JS_SOURCE $JS"
done

echo " - Listing reductable CSS"
touch $PRODUCTION_DIR/pre.css
for CSS in `grep '<link.*href="{{tpl:BlogThemeURL}}/.*.css*/>' $SOURCE | sed -r 's|(.*href="\{\{tpl:BlogThemeURL\}\}/)(.*.css)(".*)|\2|'`
    do
        echo " -  - $CSS"
        echo "/* *** $CSS */" >> $PRODUCTION_DIR/pre.css
        cat $CSS >> $PRODUCTION_DIR/pre.css
done
   
echo " - Downgrading CSS3 sources"
    myth $PRODUCTION_DIR/pre.css $PRODUCTION_DIR/ready.css

echo " - Merge JS control"
    java -jar ~/projects/closure-compiler/compiler.jar \
        $CLOSURE_OPTIONS --js  $JS_SOURCE --js_output_file $PRODUCTION_DIR/interaction.js

echo " - Compress CSS"
    myth --compress  $PRODUCTION_DIR/ready.css $PRODUCTION_DIR/style.css

# à cause de jquery, pas possible d'optimiser
#       java -jar ~/projects/closure-compiler/compiler.jar \
#       --compilation_level ADVANCED \
#       $CLOSURE_OPTIONS --js $JS_SOURCE --js_output_file $PRODUCTION_DIR/optimized.js 

echo '<link rel="stylesheet" href="{{tpl:BlogThemeURL}}/production/style.css">' >> $OUTPUT
echo '<script type="text/javascript" src="{{tpl:BlogThemeURL}}/production/interactions.js" async defer></script>' >> $OUTPUT