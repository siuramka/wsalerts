namespace tts_api.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string discordId { get; set; }
        public string username { get; set; }
        public string avatar { get; set; }
        public string discriminator { get; set; }
    }
}
