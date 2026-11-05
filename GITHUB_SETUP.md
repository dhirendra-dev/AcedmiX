# Publish AcedmiX to GitHub

This folder is an initialized local Git repository on the `main` branch, ready to connect to a new GitHub remote. The connected GitHub integration in the build session could not create a new remote repository directly.

1. In GitHub, create a new **empty** repository named `AcedmiX` under your account `dhirendra-dev`.
2. Do not initialize it with a README, license, or `.gitignore` because those files are already included here.
3. From this project folder, run:

```bash
git remote add origin https://github.com/dhirendra-dev/AcedmiX.git
git push -u origin main
```

If you intentionally use a source-only copy without the included `.git` folder, initialize Git first:

```bash
git init -b main
git add .
git commit -m "feat: build AcedmiX educational app from scratch"
git remote add origin https://github.com/dhirendra-dev/AcedmiX.git
git push -u origin main
```

The repository name may be adjusted if `AcedmiX` is unavailable.
