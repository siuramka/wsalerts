namespace tts_api.Data.Models.DTO
{
    public class DiscordUser
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string AvatarHash { get; set; }
        public string Discriminator { get; set; }
    }
}
