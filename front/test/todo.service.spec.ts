import { TestBed, getTestBed } from "@angular/core/testing";

import { Injector } from '@angular/core';
import { Http, HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { TodoService } from "../src/todo.service";

describe("TodoService", () => {
    let injector: Injector;
    let backend: MockBackend;
    let httpService: Http;
    let service: TodoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: XHRBackend, useClass: MockBackend },
                TodoService,
            ]
        });
        injector = getTestBed();

        backend = injector.get(XHRBackend);
        httpService = injector.get(Http);
        service = injector.get(TodoService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should fetch todo data", () => {
        backend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    list: [
                        { "text": "Buy milk" },
                        { "text": "Pay tax" },
                    ],
                    cursor: "2"
                }
            })));
        });

        service.list({ limit: 5 }).subscribe(resp => {
            expect(resp.list[0].text).toBe("Buy milk");
            expect(resp.list[1].text).toBe("Pay tax");

            expect(resp.cursor).toBe("2");
        });
    });
});
