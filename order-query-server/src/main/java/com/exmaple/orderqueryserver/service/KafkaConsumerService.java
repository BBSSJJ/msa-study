package com.exmaple.orderqueryserver.service;

import com.exmaple.orderqueryserver.entity.Item;
import com.exmaple.orderqueryserver.entity.Order;
import com.exmaple.orderqueryserver.message.NewOrderMessage;
import com.exmaple.orderqueryserver.repository.OrderQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final OrderQueryRepository orderQueryRepository;

    @KafkaListener(topics = "new-order", groupId = "order-group")
    public void consumeEmailQuestion(NewOrderMessage newOrderMessage) {
        System.out.println(newOrderMessage);

        List<Item> items = newOrderMessage.getItems().stream().map(Item::new).toList();

        Order order = Order.builder()
                .id(newOrderMessage.getOrderId())
                .userId(newOrderMessage.getUserId())
                .userName(newOrderMessage.getUserName())
                .items(items)
                .createdAt(LocalDateTime.parse(newOrderMessage.getCreatedAt()))
                .build();

        orderQueryRepository.save(order);
    }

}
