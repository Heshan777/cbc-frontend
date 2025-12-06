import { createClient } from "@supabase/supabase-js";

const anonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdG53cG14eHBrY21hc2praWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTE3MjAsImV4cCI6MjA4MDE4NzcyMH0.kOS2HWZbSApgjg9qmyWMFSn-gje0StPXvOm2vF0LgHo";
const supabaseUrl = "https://lftnwpmxxpkcmasjkigl.supabase.co";

const supabase = createClient(supabaseUrl, anonKey);


export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
		if (file == null) { 
		} else {
            const timestamp = new Date().getTime();
            const fileName = timestamp+file.name

			supabase.storage
				.from("images")
				.upload(fileName, file, {
					upsert: false,
					cacheControl: "3600",
				})
				.then(() => {
					const publicUrl = supabase.storage
						.from("images")
						.getPublicUrl(fileName).data.publicUrl;

					resolve(publicUrl);
				}).catch(
                    ()=>{
                        reject("An error occured")
                    }
                )
		}
	});
}