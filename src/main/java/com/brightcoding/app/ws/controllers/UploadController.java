package com.brightcoding.app.ws.controllers;

import com.brightcoding.app.ws.responses.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @PostMapping("/avatar")
    public ResponseEntity<ResponseMessage> uploadAvatar(@RequestParam("file") List<MultipartFile> files) {

        HttpStatus status = HttpStatus.OK;
        String message = "";

        // TODO save avatar with session

        return ResponseEntity.status(status).body(new ResponseMessage(message));
    }

    @PostMapping("/place-picture")
    public ResponseEntity<ResponseMessage> uploadPlacePicture(@RequestParam("file") List<MultipartFile> files,
                                                      @RequestParam("idPlace") long idPlace) {

        HttpStatus status = HttpStatus.OK;
        String message = "";

        // TODO save picture place to place

        return ResponseEntity.status(status).body(new ResponseMessage(message));
    }
}
