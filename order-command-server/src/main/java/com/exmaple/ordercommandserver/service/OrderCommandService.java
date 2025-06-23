package com.exmaple.ordercommandserver.service;

import com.exmaple.ordercommandserver.dto.CreateOrderDto;
import com.exmaple.ordercommandserver.entity.Item;
import com.exmaple.ordercommandserver.entity.Order;
import com.exmaple.ordercommandserver.entity.User;
import com.exmaple.ordercommandserver.repository.OrderCommandRepository;
import com.exmaple.ordercommandserver.repository.ProductRepository;
import com.exmaple.ordercommandserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderCommandService {

    private final OrderCommandRepository orderCommandRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public void createOrder(CreateOrderDto createOrderDto) {
        String orderId = UUID.randomUUID().toString();
        User user = userRepository.getReferenceById(createOrderDto.getUserId());
        Order order = Order.builder()
                .id(orderId)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        List<Item> items = createOrderDto.getItems().stream()
                .map(itemDto -> Item.builder()
                        .order(order)
                        .product(productRepository.getReferenceById(itemDto.getProductId()))
                        .quantity(itemDto.getQuantity())
                        .price(itemDto.getPrice())
                        .build()).toList();

        order.addItems(items);

        orderCommandRepository.save(order);
    }
}
