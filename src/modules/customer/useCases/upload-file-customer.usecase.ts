import { Injectable } from "@nestjs/common";
import { FileDto } from "../dto/upload-file.dto";
import { createClient } from "@supabase/supabase-js";


@Injectable()
export class UploadFileCustomerUseCase {
    async upload(file: FileDto) {
        const supabaseURL = "https://cjbbewfdfhqgiyrgukqj.supabase.co";
        const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqYmJld2ZkZmhxZ2l5cmd1a3FqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjc4NjkyMCwiZXhwIjoyMDc4MzYyOTIwfQ.K6SGTkx_5ZuCAMiSMzn31zC0mrzNjoEhtVmDg9rC_QU";
        
        const supabase = createClient(supabaseURL, supabaseKEY, {
            auth: {
                persistSession: false,
            }
        })

        const data = await supabase.storage.from("customer").upload(file.originalname, file.buffer, {
            upsert: true,
        })

        return data;
    }
}