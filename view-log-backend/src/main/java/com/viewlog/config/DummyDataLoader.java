package com.viewlog.config;

import com.viewlog.entity.WatchItem;
import com.viewlog.entity.WatchItemGenre;
import com.viewlog.entity.WatchItemType;
import com.viewlog.repository.WatchItemRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DummyDataLoader {

    private final WatchItemRepository repository;

    @PostConstruct
    public void init() {

        // Prevent duplicate inserts (only insert when table empty)
        if (repository.count() > 0) return;

        create("Inception", WatchItemType.MOVIE, WatchItemGenre.SCI_FI, 8.8, true,
                "A mind-bending sci-fi thriller.");

        create("Breaking Bad", WatchItemType.TV_SHOW, WatchItemGenre.CRIME, 9.5, true,
                "High school chemistry teacher becomes drug kingpin.");

        create("Planet Earth", WatchItemType.DOCUMENTARY, WatchItemGenre.NATURE, 9.4, false,
                "Stunning wildlife documentary.");

        create("Interstellar", WatchItemType.MOVIE, WatchItemGenre.SCI_FI, 8.6, true,
                "Explores black holes, time dilation, and love.");

        create("Sherlock", WatchItemType.TV_SHOW, WatchItemGenre.MYSTERY, 9.1, false,
                "Modern Sherlock Holmes detective series.");

        create("Chernobyl", WatchItemType.DOCUMENTARY, WatchItemGenre.HISTORY, 9.7, true,
                "Top-rated mini-series based on true events.");

        create("The Lion King", WatchItemType.MOVIE, WatchItemGenre.ANIMATION, 8.4, false,
                "Classic animated film loved worldwide.");
    }

    private void create(String name, WatchItemType type, WatchItemGenre genre,
                        double rating, boolean watched, String notes) {

        WatchItem item = WatchItem.builder()
                .name(name)
                .type(type)
                .genre(genre)
                .rating(rating)
                .watched(watched)
                .notes(notes)
                .build();

        repository.save(item);
    }
}
