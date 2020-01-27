package com.blockide.blockide.runner;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;

import java.io.*;
import java.nio.file.Files;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class ProgramRunner {

    private static final String BASE_DIRECTORY = "C:\\Users\\softw\\Documents\\MAN\\block-ide\\programRuns";

    private static final String COMPILE_CPP_CMD = "C:\\MinGW\\bin\\g++.exe -o %s/main %s/main.cc -std=c++11";

    private static final String RUN_CPP_CMD = "%s/main < %s/input.txt";

    private final Path currentDirectory;

    private static Path createDirectory(String directory) throws IOException {
        Path path = Paths.get(directory);
        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }
        return path;
    }

    public ProgramRunner() throws IOException {
        createDirectory(BASE_DIRECTORY);
        currentDirectory = createDirectory(String.format("%s/%s", BASE_DIRECTORY, UUID.randomUUID().toString()));
    }

    public String run(String sourceCode, String input) throws IOException {
        createSourceCodeFile(sourceCode);
        createFileInCurrentDirectory("input.txt", input);
        createFileInCurrentDirectory( "output.txt", "");
        compileCpp();
        runCpp();
        return readOutput();
    }

    private void createSourceCodeFile(String source) throws IOException {
        String fileName = "main.cc";
        BufferedWriter writer = new BufferedWriter(new FileWriter(String.format("%s\\%s", currentDirectory, fileName)));
        writer.write(source);
        writer.close();
    }

    private void createFileInCurrentDirectory(String fileName, String content) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter(String.format("%s\\%s", currentDirectory, fileName)));
        writer.write(content);
        writer.close();
    }


    private int compileCpp() throws IOException {
        String cmd = String.format(COMPILE_CPP_CMD, currentDirectory, currentDirectory);
        return execCmd(cmd);
    }

    private int runCpp() throws IOException {
        String cmd = String.format(RUN_CPP_CMD, currentDirectory, currentDirectory, currentDirectory);
        CommandLine cmdLine = CommandLine.parse(cmd);
        DefaultExecutor executor = new DefaultExecutor();
        FileOutputStream output = new FileOutputStream((String.format("%s\\%s", currentDirectory, "output.txt")));
        FileInputStream input = new FileInputStream((String.format("%s\\%s", currentDirectory, "input.txt")));
        executor.setStreamHandler(new PumpStreamHandler(output, output, input));
        return executor.execute(cmdLine);
    }

    private static int execCmd(String cmd) throws IOException {
        CommandLine cmdLine = CommandLine.parse(cmd);
        DefaultExecutor executor = new DefaultExecutor();
        return executor.execute(cmdLine);
    }

    private String readOutput() throws IOException {
        return new String(Files.readAllBytes(currentDirectory.resolve("output.txt")));
    }
}
