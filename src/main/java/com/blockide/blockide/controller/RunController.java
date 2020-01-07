package com.blockide.blockide.controller;

import com.blockide.blockide.converter.Converter;
import com.blockide.blockide.converter.Lang;
import com.blockide.blockide.model.ConvertRequest;
import org.apache.tomcat.jni.Proc;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.zip.InflaterOutputStream;

@RestController
@RequestMapping("/run")
public class RunController {

    @PostMapping
    public String convert(@RequestBody ConvertRequest request) throws IOException, InterruptedException {
        Converter converter = new Converter("cpp".equalsIgnoreCase(request.getLang()) ? Lang.CPP : Lang.JAVA);
        String code = converter.generateCode(request.getGraph());
        BufferedWriter writer = new BufferedWriter(new FileWriter("app." + request.getLang().toLowerCase()));
        writer.write(code);
        writer.close();
        /*Runtime runtime = Runtime.getRuntime();
        Process process = runtime.exec("java app.java");
        Process process1 = runtime.exec("java app");
        BufferedReader in = new BufferedReader(new InputStreamReader(process1.getInputStream()));
        System.out.println("kjnahskndfknKBDGKNBDFKJNSDFKLJJDKFL;SDJGK AIO");
        OutputStream out = process.getOutputStream();
        String input = in.readLine();
        while (input != null) {
            System.out.println(in);
            out.write(input.getBytes());
            process.wait(1000);
            out.flush();
            input = in.readLine();
        }*/
        return code;
    }
}
