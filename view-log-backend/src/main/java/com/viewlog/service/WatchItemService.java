package com.viewlog.service;

import com.viewlog.entity.WatchItem;
import com.viewlog.entity.WatchItemGenre;
import com.viewlog.entity.WatchItemType;
import com.viewlog.repository.WatchItemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchItemService {

    private final WatchItemRepository watchItemRepository;

    public WatchItemService(WatchItemRepository watchItemRepository) {
        this.watchItemRepository = watchItemRepository;
    }

    public List<WatchItem> getAll() {
        return watchItemRepository.findAll();
    }

    public WatchItem getById(Long id) {
        return watchItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("WatchItem not found with ID: " + id));
    }

    public WatchItem save(WatchItem watchItem) {
        return watchItemRepository.save(watchItem);
    }

    public WatchItem update(Long id, WatchItem updatedItem) {
        WatchItem existing = getById(id);

        existing.setName(updatedItem.getName());
        existing.setType(updatedItem.getType());
        existing.setGenre(updatedItem.getGenre());
        existing.setRating(updatedItem.getRating());
        existing.setWatched(updatedItem.isWatched());
        existing.setNotes(updatedItem.getNotes());

        return watchItemRepository.save(existing);
    }

    public void delete(Long id) {
        if (!watchItemRepository.existsById(id)) {
            throw new EntityNotFoundException("WatchItem not found with ID: " + id);
        }
        watchItemRepository.deleteById(id);
    }

    public WatchItem toggleWatched(Long id) {
        WatchItem item = getById(id);
        item.setWatched(!item.isWatched());
        return watchItemRepository.save(item);
    }

    public List<WatchItem> findByType(WatchItemType type) {
        return watchItemRepository.findByType(type);
    }

    public List<WatchItem> findByGenre(WatchItemGenre genre) {
        return watchItemRepository.findByGenre(genre);
    }

    public List<WatchItem> findByWatched(boolean watched) {
        return watchItemRepository.findByWatched(watched);
    }

}
