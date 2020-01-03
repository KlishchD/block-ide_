package com.blockide.blockide.converter;

public final class LanguageTemplate {

    private LanguageTemplate() {}

    private static final String CPP_HEADER = "#include <iostream>\n\n" +
            "using namespace std;\n\n" +
            "int main() {\n";

    private static final String CPP_FOOTER = "  return 0;\n}";

    private static final String JAVA_HEADER = "import java.util.Scanner;\n\n" +
            "public class Main {\n" +
            "  public static void main (String args[]){\n" +
            "    Scanner scanner = new Scanner(System.in);\n";

    private static final String JAVA_FOOTER = "  }\n" +
            "}";

    public static String getFullProgram(String body, Lang lang) {
        if (lang == Lang.CPP) {
            return CPP_HEADER + body + CPP_FOOTER;
        } else if (lang == Lang.JAVA) {
            return JAVA_HEADER + body + JAVA_FOOTER;
        } else {
            throw new IllegalArgumentException("Unsupported language  :" + lang);
        }
    }
}
