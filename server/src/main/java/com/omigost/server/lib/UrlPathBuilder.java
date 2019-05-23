package com.omigost.server.lib;

public class UrlPathBuilder {
    private String path;

    public UrlPathBuilder(String domain) {
        this.path = domain.trim();
    }

    public UrlPathBuilder append(String subpath) {
        this.path = cutoffSlashes(path) + '/' + cutoffSlashes(subpath);
        return this;
    }

    public String build() {
        return this.path;
    }

    private String cutoffSlashes(String s) {
        s = s.trim();
        if (s.endsWith("/")) {
            s = s.substring(0, s.length() - 1);
        }
        if (s.startsWith("/")) {
            s = s.substring(1);
        }
        return s;
    }
}
