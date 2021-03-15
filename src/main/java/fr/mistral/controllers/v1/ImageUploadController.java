package fr.mistral.controllers.v1;

import fr.mistral.domain.ImageModel;
import fr.mistral.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


/**
 * Created by hel on 12/03/21.
 */
@RestController
@Transactional
@RequestMapping(ImageUploadController.BASE_URL)
public class ImageUploadController {


    public static final String BASE_URL = "/api/v1/image";
    @Autowired
    ImageRepository imageRepository;

    public static byte[] compressBytes(byte[] data) {

        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {

            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();

    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();

        } catch (IOException ioe) {

        } catch (DataFormatException e) {

        }
        return outputStream.toByteArray();

    }

    @DeleteMapping("/delete/{name}")

    public void deleteImage(@PathVariable("name") String name) {

        imageRepository.delete(name);
    }

    // compress the image bytes before storing it in the database
    @PostMapping("/upload")

    public ResponseEntity uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));

        return new ResponseEntity<>(imageRepository.save(img),
                HttpStatus.OK);

    }

    // uncompress the image bytes before returning it to the angular application

    @GetMapping(path = {"/get/{imageName}"})

    public ImageModel getImage(@PathVariable("imageName") String imageName) {

      /*  final ImageModel retrievedImage = imageRepository.findByName(imageName);
        if (retrievedImage == null) {
            ImageModel img = new ImageModel();

            return img;
        }
        ImageModel img = new ImageModel(retrievedImage.getName(), retrievedImage.getType(),
                decompressBytes(retrievedImage.getPicByte()));

        return img;*/
        final List<ImageModel> retrievedImage = imageRepository.findByName(imageName);

        if (retrievedImage.size() == 0) {
            ImageModel img = new ImageModel();

            return img;
        }


        ImageModel img = new ImageModel(retrievedImage.get(0).getName(), retrievedImage.get(0).getType(),
                decompressBytes(retrievedImage.get(0).getPicByte()));

        return img;

    }

}
