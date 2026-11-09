# KAYA Hiring System Deployment

## Every time may update

1. Open the project folder:
   `C:\Users\USER\Desktop\KAYA Hiring System`
2. Open GitHub Desktop or your Git client.
3. Select repository: `gibprecones/kayahiringsystem`.
4. Review the changed files.
5. Commit with a short message, for example:
   `Connect hiring data to Cloudflare R2`
6. Click **Push origin** to the `master` branch.
7. Cloudflare Pages will automatically deploy the new commit.

## Cloudflare R2 binding

In Cloudflare Pages → `kayahiringsystem` → Settings → Bindings:

- Binding type: R2 bucket
- Variable name: `KAYAHIRING_STORAGE`
- Bucket: `kaya-production-storage`

## Verify after deployment

Open `https://kayahiringsystem.pages.dev`, sign in through Cloudflare Access, then:

- Add or edit a candidate and refresh the page.
- Upload a test resume.
- Confirm the data remains after reopening the site.

If deployment fails, open Cloudflare Pages → Deployments and check the latest build log.
