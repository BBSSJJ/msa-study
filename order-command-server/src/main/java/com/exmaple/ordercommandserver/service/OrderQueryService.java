package com.exmaple.ordercommandserver.service;

import com.exmaple.ordercommandserver.dto.ListDto;
import com.exmaple.ordercommandserver.dto.OrderQueryDto;
import com.exmaple.ordercommandserver.entity.Order;
import com.exmaple.ordercommandserver.repository.OrderQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderQueryService {

    private final OrderQueryRepository orderQueryRepository;

    public ListDto<OrderQueryDto> getAllOrders() {

        long startTime = System.currentTimeMillis();
        List<Order> orderList = orderQueryRepository.findAll();
        long elapsedTime = System.currentTimeMillis() - startTime;

        List<OrderQueryDto> orderQueryDtoList = orderList
                .stream()
                .map(OrderQueryDto::new)
                .toList();

        return new ListDto<OrderQueryDto>(orderQueryDtoList, elapsedTime);
    }
}
