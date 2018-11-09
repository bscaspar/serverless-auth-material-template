import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const fileName = `${Date.now()}-${file.name}`;

  //Storage.vault.put adds the file to a private storage instance (belonging to the logged in user)
  const stored = await Storage.vault.put(fileName, file, {
    contentType: file.type
  });

  return stored.key;
}

export async function s3Delete(fileKey) {
  //deletes a file from the bucket
  return Storage.vault.remove(fileKey);
}
