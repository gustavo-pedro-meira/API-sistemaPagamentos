import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, of, tap } from "rxjs";


@Injectable()
export class LoggingInterceptorCustomer implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const cot = context.getClass();

        console.log(`Classe: ${cot.name}`);
        console.log("Antes do controller...");
        console.log(`Metodo: ${req.method} | URL: ${req.url}`);
        if(req.body && Object.keys(req.body).length > 0){
            console.log(`Corpo do Body: ${JSON.stringify(req.body)}`);
        }

        return next.handle().pipe(
            tap((response) => {
                const duration = Date.now() - now;
                console.log(`Response: ${JSON.stringify(response)}`);
                console.log(`Status: ${res.statusCode} | Duração: ${duration}ms`)
            }),
            catchError((error) => {
                console.error(`Error no controller: ${error.message}`);
                const duration = Date.now() - now;
                console.log(`Erro processado em ${duration}ms`);
                return of(error);
            })
        )
    }
}