namespace tts_api.Data.Models
{
//    model Provider
//    {
//        id Int @id @default(autoincrement())
//  name String
//  voices Voice []
//}
    public class Provider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Voice> Voices { get; set;}
    }
}
