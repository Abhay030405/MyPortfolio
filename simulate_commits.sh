#!/bin/bash

# Total commits
TOTAL=100
# Dates range
START_DATE="2024-05-25"
END_DATE="2024-05-27"

# Get all project files
FILES=( $(find . -type f ! -path "./.git/*" ! -name "simulate_commits.sh") )

# Calculate how many commits per file
PER_FILE=$((TOTAL / ${#FILES[@]} + 1))

count=0
echo "Starting fake commits..."

for file in "${FILES[@]}"; do
    for ((i = 0; i < PER_FILE; i++)); do
        echo "// update $RANDOM" >> "$file"
        GIT_AUTHOR_DATE="$(shuf -i $(date -d $START_DATE +%s)-$(date -d $END_DATE +%s) -n 1)"; export GIT_AUTHOR_DATE=$(date -d @$GIT_AUTHOR_DATE)
        GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        git add "$file"
        git commit -m "Update $(basename $file) - commit $((++count))" --date="$GIT_AUTHOR_DATE"
        if [ $count -ge $TOTAL ]; then
            break 2
        fi
    done
done

echo "Done! Created $count commits."
