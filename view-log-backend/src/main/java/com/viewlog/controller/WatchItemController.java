package com.viewlog.controller;

import com.viewlog.entity.WatchItem;
import com.viewlog.entity.WatchItemGenre;
import com.viewlog.entity.WatchItemType;
import com.viewlog.service.WatchItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
@CrossOrigin(origins = "*")
public class WatchItemController {

    private final WatchItemService watchItemService;

    public WatchItemController(WatchItemService watchItemService) {
        this.watchItemService = watchItemService;
    }

    @GetMapping
    public ResponseEntity<List<WatchItem>> getAll() {
        return ResponseEntity.ok(watchItemService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WatchItem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(watchItemService.getById(id));
    }

    @PostMapping
    public ResponseEntity<WatchItem> create(@RequestBody WatchItem watchItem) {
        return ResponseEntity.ok(watchItemService.save(watchItem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WatchItem> update(@PathVariable Long id,
                                            @RequestBody WatchItem updatedItem) {
        return ResponseEntity.ok(watchItemService.update(id, updatedItem));
    }

    @PutMapping("/{id}/watched")
    public ResponseEntity<WatchItem> toggleWatched(@PathVariable Long id) {
        return ResponseEntity.ok(watchItemService.toggleWatched(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        watchItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<WatchItem>> getByType(@PathVariable WatchItemType type) {
        return ResponseEntity.ok(watchItemService.findByType(type));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<WatchItem>> getByGenre(@PathVariable WatchItemGenre genre) {
        return ResponseEntity.ok(watchItemService.findByGenre(genre));
    }

    @GetMapping("/watched/{status}")
    public ResponseEntity<List<WatchItem>> getByWatched(@PathVariable boolean status) {
        return ResponseEntity.ok(watchItemService.findByWatched(status));
    }
}
