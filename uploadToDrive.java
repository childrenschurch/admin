import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.ParentReference;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

public class DriveUploadExample {
    private static final String APPLICATION_NAME = "Drive API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String[] SCOPES = { DriveScopes.DRIVE_FILE };
    private static final String FOLDER_NAME = "attendance";
    private static final String MIME_TYPE = "application/vnd.ms-excel";

    public static void main(String... args) throws Exception {
        // Load the credentials from the JSON file.
        Credential credential = loadCredentials();

        // Build the Drive API client.
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        Drive drive = new Drive.Builder(httpTransport, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();

        // Find the folder ID for the given folder name.
        String folderId = findFolderId(drive, FOLDER_NAME);

        // Upload the file to the folder.
        java.io.File excelFile = new java.io.File("example.xlsx");
        String fileName = excelFile.getName();
        InputStream inputStream = new FileInputStream(excelFile);
        InputStreamContent fileContent = new InputStreamContent(MIME_TYPE, inputStream);
        File fileMetadata = new File();
        fileMetadata.setName(fileName);
        fileMetadata.setParents(Arrays.asList(new ParentReference().setId(folderId)));
        File file = drive.files().create(fileMetadata, fileContent).setFields("id,webContentLink").execute();

        // Print the file ID and webContentLink for confirmation.
        System.out.printf("File ID: %s\n", file.getId());
        System.out.printf("Web Content Link: %s\n", file.getWebContentLink());
    }

    private static Credential loadCredentials() throws IOException {
        // Load the credentials from the JSON file.
        InputStream in = DriveUploadExample.class.getResourceAsStream("/credentials.json");
        GoogleCredential credential = GoogleCredential.fromStream(in)
                .createScoped(Arrays.asList(SCOPES));
        return credential;
    }

    private static String findFolderId(Drive drive, String folderName) throws IOException {
        // Search for the folder by name and return its ID.
        String folderId = null;
        String query = "mimeType='application/vnd.google-apps.folder' and trashed=false and name='" + folderName + "'";
        FileList result = drive.files().list().setQ(query).setSpaces("drive").execute();
        List<File> files = result.getFiles();
        if (files != null && files.size() > 0) {
            File folder = files.get(0);
            folderId = folder.getId();
        }
        return folderId;
    }
}
