import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = AppConfig.springApiUrl; // Base URL for the API
  private transactionsUrl = `${this.baseUrl}/api/transactions`; // URL for transactions endpoint

  constructor(private httpClient: HttpClient) { }

  getTransactions(): Observable<Transaction[]> { // Fetch all transactions from the API
    return this.httpClient.get<Transaction[]>(this.transactionsUrl);
  }

  getTransactionById(id: number): Observable<Transaction> { // Fetch a transaction by ID
    const url = `${this.transactionsUrl}/${id}`;
    return this.httpClient.get<Transaction>(url);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> { // Create a new transaction
    return this.httpClient.post<Transaction>(this.transactionsUrl, transaction);
  }

  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> { // Update an existing transaction
    const url = `${this.transactionsUrl}/${id}`;
    return this.httpClient.put<Transaction>(url, transaction);
  }

  deleteTransaction(id: number): Observable<any> {
    const url = `${this.transactionsUrl}/${id}`;
    return this.httpClient.delete<any>(url);
  }
}
