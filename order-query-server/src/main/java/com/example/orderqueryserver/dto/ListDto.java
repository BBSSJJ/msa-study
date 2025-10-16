package com.example.orderqueryserver.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ListDto<T> {
    private List<T> list;
    private long elapsedTime;

    public ListDto(List<T> list, long elapsedTime) {
        this.list = list;
        this.elapsedTime = elapsedTime;
    }
}
