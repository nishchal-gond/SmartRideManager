import os
import datetime
import subprocess
import sys

# ✅ 1. Set your actual repo path
repo_path = r"C:\Users\USER\Desktop\‎\SmartRideManager"  # <-- change if needed

# ✅ 2. Check if path exists
if not os.path.exists(repo_path):
    print(f"❌ Error: The path '{repo_path}' does not exist.")
    sys.exit(1)

# ✅ 3. Change directory to repo
os.chdir(repo_path)
print(f"📂 Working in: {repo_path}")

# ✅ 4. Create or update a dummy file (optional)
# This ensures there’s always something to commit
with open("auto_update.txt", "a", encoding="utf-8") as f:
    f.write(f"Auto update on {datetime.datetime.now()}\n")

# ✅ 5. Define git commands
commands = [
    "git add .",
    f'git commit -m "Automated commit on {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}"',
    "git pull origin main --rebase",
    "git push origin main"
]

# ✅ 6. Run each command safely
for cmd in commands:
    print(f"\n⚙️ Running: {cmd}")
    result = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    if result.returncode == 0:
        print(f"✅ Success:\n{result.stdout}")
    else:
        print(f"⚠️ Error running '{cmd}':\n{result.stderr}")

print("\n🚀 Auto commit and push completed successfully!")
