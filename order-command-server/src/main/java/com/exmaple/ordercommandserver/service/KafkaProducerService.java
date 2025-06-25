package com.exmaple.ordercommandserver.service;

import com.exmaple.ordercommandserver.message.NewOrderMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {
    private final KafkaTemplate<String, NewOrderMessage> kafkaTemplate;

    public void sendOrder(NewOrderMessage newOrderMessage) {
        kafkaTemplate.send("new-order", newOrderMessage);
        System.out.println("Sent message: " + newOrderMessage.toString());
    }
}
