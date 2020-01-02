package com.blockide.blockide.converter;

import com.blockide.blockide.converter.blocks.*;
import com.blockide.blockide.model.BlockModel;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public final class BlockResolver {

    private BlockResolver() {
        register("read", Lang.CPP, ReadBlockCpp.class);
        register("read", Lang.JAVA, ReadBlockJava.class);
        register("if", Lang.CPP, IfBlock.class);
        register("if", Lang.JAVA, IfBlock.class);
        register("while", Lang.CPP, WhileBlock.class);
        register("while", Lang.JAVA, WhileBlock.class);
        register("forTo", Lang.CPP, ForToBlock.class);
        register("forTo", Lang.JAVA, ForToBlock.class);
        register("forDownTo", Lang.CPP, ForDownToBlock.class);
        register("forDownTo", Lang.JAVA, ForDownToBlock.class);
        register("print", Lang.CPP, PrintBlockCpp.class);
        register("print", Lang.JAVA, PrintBlockJava.class);
        register("var", Lang.CPP, VarBlockCpp.class);
        register("var", Lang.JAVA, VarBlockJava.class);
    }

    private static BlockResolver instance;

    private Map<String, Class<?>> cppBlocks = new HashMap<>();

    private Map<String, Class<?>> javaBlocks = new HashMap<>();


    public static synchronized BlockResolver getInstance() {
        if (instance == null) {
            instance = new BlockResolver();
        }
        return instance;
    }

    private void register(String name, Lang lang, Class<?> clazz) {
        if (lang == Lang.JAVA) {
            javaBlocks.put(name, clazz);
        } else {
            cppBlocks.put(name, clazz);
        }
    }

    public Block getBlock(BlockModel model, Lang lang) {
        try {
            Class<?> clazz = lang == Lang.JAVA ? javaBlocks.get(model.getName()) : cppBlocks.get(model.getName());
            return (Block) clazz.getConstructor(BlockModel.class).newInstance(model);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException ex) {
            // ignore
            throw new IllegalStateException("Cannot instantiate block. Exception: " + ex.toString());
        }
    }
}
