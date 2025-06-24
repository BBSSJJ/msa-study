package com.exmaple.ordercommandserver.service;

import com.exmaple.ordercommandserver.dto.OrderQueryDto;
import com.exmaple.ordercommandserver.repository.OrderQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderQueryService {

    private final OrderQueryRepository orderQueryRepository;

    public List<OrderQueryDto> getAllOrders() {
        return orderQueryRepository.findAll()
                .stream()
                .map(OrderQueryDto::new)
                .toList();
    }
}
