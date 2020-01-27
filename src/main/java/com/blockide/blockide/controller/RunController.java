package com.blockide.blockide.controller;

import com.blockide.blockide.converter.Converter;
import com.blockide.blockide.converter.Lang;
import com.blockide.blockide.model.RunRequest;
import com.blockide.blockide.runner.ProgramRunner;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

@RestController
@RequestMapping("/run")
public class RunController {

    @PostMapping
    public String convert(@RequestBody RunRequest request) throws IOException, InterruptedException {
        Converter converter = new Converter(Lang.CPP);
        String code = converter.generateCode(request.getConvertRequest().getGraph());
        ProgramRunner run = new ProgramRunner();
        return run.run(code, request.getInput());
    }
}
