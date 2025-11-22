package com.viewlog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Table(name = "watch_item")
public class WatchItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private WatchItemType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre", nullable = false)
    private WatchItemGenre genre;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "watched")
    private boolean watched;

    @Column(name = "notes", length = 1000)
    private String notes;
}