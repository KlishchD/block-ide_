package com.blockide.blockide.controller;

import com.blockide.blockide.converter.Converter;
import com.blockide.blockide.converter.Lang;
import com.blockide.blockide.model.ConvertRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/convert")
public class ConvertController {

    @PostMapping
    public String convert(@RequestBody ConvertRequest request) {
        Converter converter = new Converter("cpp".equalsIgnoreCase(request.getLang()) ? Lang.CPP : Lang.JAVA);
        return converter.generateCode(request.getGraph());
    }
}
