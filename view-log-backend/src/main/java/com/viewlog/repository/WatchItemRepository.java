package com.viewlog.repository;

import com.viewlog.entity.WatchItem;
import com.viewlog.entity.WatchItemGenre;
import com.viewlog.entity.WatchItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchItemRepository extends JpaRepository<WatchItem, Long> {

    List<WatchItem> findByType(WatchItemType type);

    List<WatchItem> findByGenre(WatchItemGenre genre);

    List<WatchItem> findByWatched(boolean watched);

}
