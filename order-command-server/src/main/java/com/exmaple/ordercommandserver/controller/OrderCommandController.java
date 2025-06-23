package com.exmaple.ordercommandserver.controller;

import com.exmaple.ordercommandserver.dto.CreateOrderDto;
import com.exmaple.ordercommandserver.service.OrderCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderCommandController {

    private final OrderCommandService orderCommandService;

    @PostMapping()
    public ResponseEntity<Void> createOrder(@RequestBody CreateOrderDto createOrderDto) {
        orderCommandService.createOrder(createOrderDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
