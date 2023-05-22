namespace tts_api.Data.Models.DTO
{
    public class VoiceInsert
    {
        public string Name { get; set; }
        public string? DisplayName { get; set; }
        public bool Selected { get; set; }
        public int ProviderId { get; set; }
    }
}
