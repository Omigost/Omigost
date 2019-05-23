package com.omigost.server.notification;

import com.omigost.server.lib.UrlPathBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MessageLinkProvider {
    @Value("${omigost.frontend.url}")
    private String frontendUrl;

    public NotificationMessageLink frontendLink(String text, String url) {
        return frontendLink(text, url, "primary");
    }

    public NotificationMessageLink frontendLink(String text, String url, String style) {
        return new NotificationMessageLink(
                text,
                provideUrlWithDomain(frontendUrl, url),
                style);
    }

    private String provideUrlWithDomain(String domain, String subpath) {
        if (subpath.startsWith("http")) return subpath;
        return new UrlPathBuilder(domain).append(subpath).build();
    }
}
