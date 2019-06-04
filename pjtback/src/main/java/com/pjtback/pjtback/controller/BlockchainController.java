package com.pjtback.pjtback.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@RestController
public class BlockchainController {

    /**
     * Get blockchain
     */
    @GetMapping("/blocks")
    public @ResponseBody ResponseEntity<String> getBlocks() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject("http://localhost:3001/blocks",String.class);
        return new ResponseEntity<String>(response,HttpStatus.OK);
    }

    @GetMapping("/transactionsPool")
    public @ResponseBody ResponseEntity<String> getTransactions() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject("http://localhost:3001/transactionPool",String.class);
        return new ResponseEntity<String>(response,HttpStatus.OK);
    }

    @GetMapping("/peers")
    public @ResponseBody ResponseEntity<String> getPeers() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject("http://localhost:3001/peers",String.class);
        return new ResponseEntity<String>(response,HttpStatus.OK);
    }

    @GetMapping("/balance")
    public @ResponseBody ResponseEntity<String> getBalance() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject("http://localhost:3001/balance",String.class);
        return new ResponseEntity<String>(response,HttpStatus.OK);
    }

    @GetMapping("/address/{address}")
    public @ResponseBody ResponseEntity<String> getInfoAddress(@PathVariable String address) {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject("http://localhost:3001/address/"+address,String.class);
        return new ResponseEntity<String>(response,HttpStatus.OK);
    }

}
