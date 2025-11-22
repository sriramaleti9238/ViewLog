package com.viewlog.service;

import com.viewlog.entity.WatchItem;
import com.viewlog.entity.WatchItemGenre;
import com.viewlog.entity.WatchItemType;
import com.viewlog.repository.WatchItemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WatchItemService {

    private final WatchItemRepository watchItemRepository;

    public WatchItemService(WatchItemRepository watchItemRepository) {
        this.watchItemRepository = watchItemRepository;
    }

    public List<WatchItem> getAll() {
        log.info("Fetching all watch items");
        List<WatchItem> items = watchItemRepository.findAll();
        log.debug("Total items found: {}", items.size());
        return items;
    }

    public WatchItem getById(Long id) {
        log.info("Fetching WatchItem by ID: {}", id);
        return watchItemRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("WatchItem not found with ID: {}", id);
                    return new EntityNotFoundException("WatchItem not found with ID: " + id);
                });
    }

    public WatchItem save(WatchItem watchItem) {
        log.info("Saving new WatchItem: {}", watchItem.getName());
        return watchItemRepository.save(watchItem);
    }

    public WatchItem update(Long id, WatchItem updatedItem) {
        log.info("Updating WatchItem with ID: {}", id);

        WatchItem existing = getById(id);

        log.debug("Before update: {}", existing);

        existing.setName(updatedItem.getName());
        existing.setType(updatedItem.getType());
        existing.setGenre(updatedItem.getGenre());
        existing.setRating(updatedItem.getRating());
        existing.setWatched(updatedItem.isWatched());
        existing.setNotes(updatedItem.getNotes());

        log.debug("After update: {}", existing);

        return watchItemRepository.save(existing);
    }

    public void delete(Long id) {
        log.info("Deleting WatchItem with ID: {}", id);

        if (!watchItemRepository.existsById(id)) {
            log.warn("Delete failed — WatchItem not found with ID: {}", id);
            throw new EntityNotFoundException("WatchItem not found with ID: " + id);
        }

        watchItemRepository.deleteById(id);
        log.info("WatchItem deleted successfully (ID: {})", id);
    }

    public WatchItem toggleWatched(Long id) {
        log.info("Toggling watched status for WatchItem ID: {}", id);

        WatchItem item = getById(id);
        boolean newStatus = !item.isWatched();

        item.setWatched(newStatus);

        log.debug("Updated watched status for ID {}: {}", id, newStatus);

        return watchItemRepository.save(item);
    }

    public List<WatchItem> findByType(WatchItemType type) {
        log.info("Finding items by type: {}", type);
        return watchItemRepository.findByType(type);
    }

    public List<WatchItem> findByGenre(WatchItemGenre genre) {
        log.info("Finding items by genre: {}", genre);
        return watchItemRepository.findByGenre(genre);
    }

    public List<WatchItem> findByWatched(boolean watched) {
        log.info("Finding items by watched = {}", watched);
        return watchItemRepository.findByWatched(watched);
    }
}
