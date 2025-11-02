import os
import datetime
import subprocess

# Your repo path
repo_path = r"C:\path\to\SmartRideManager"

# Go to repo directory
os.chdir(repo_path)

# Create/update a dummy file (to make sure there’s something to commit)
with open("auto_update.txt", "a") as f:
    f.write(f"Auto update on {datetime.datetime.now()}\n")

# Git commands
commands = [
    "git add .",
    f'git commit -m "Automated commit on {datetime.datetime.now()}"',
    "git push origin main"
]

for cmd in commands:
    subprocess.run(cmd, shell=True)
