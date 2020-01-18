package com.blockide.blockide.converter;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;
import com.blockide.blockide.model.Graph;

import java.util.HashMap;
import java.util.Map;

public class Converter {

    private Lang lang;

    public Converter(Lang lang) {
        this.lang = lang;
    }

    private StringBuilder dfs(Integer v, Map<Integer, BlockModel> g) {
        if (v == null || v < 0) {
            return new StringBuilder();
        }
        BlockResolver blockResolver = BlockResolver.getInstance();
        BlockModel blockModel = g.get(v);
        StringBuilder buff = new StringBuilder();
        if (blockModel.getChildrenIds() != null) {
            for (int i = 0; i < blockModel.getChildrenIds().size(); ++i) {
                BlockModel childModel = g.get(blockModel.getChildrenIds().get(i));
                Argument argument = new Argument();
                argument.setName(String.format("child_%d", i));
                argument.setValue(dfs(childModel.getId(), g).toString());
                blockModel.getArguments().add(argument);
            }
        }
        buff.append(addTabs(blockResolver.getBlock(blockModel, lang).generateCode()));
        buff.append("\n");
        buff.append(dfs(blockModel.getNextId(), g));
        return buff;
    }

    public String generateCode(Graph graph) {
        Map<Integer, BlockModel> g = new HashMap<>();
        for (BlockModel current : graph.getBlocks()) {
            g.put(current.getId(), current);
        }
        String body = dfs(g.get(0).getNextId(), g).toString();
        if (lang == Lang.JAVA && g.get(0).getNextId() != null) {
            body = addTabs(body);
        }
        return LanguageTemplate.getFullProgram(body, lang);
    }

    private String addTabs (String s) {
        StringBuilder buff = new StringBuilder();
        buff.append("  ");
        for (int i = 0; i < s.length(); ++i) {
            buff.append(s.charAt(i));
            if (s.charAt(i) == '\n' && i != s.length() - 1) {
                buff.append("  ");
            }
        }
        return buff.toString();
    }
}
