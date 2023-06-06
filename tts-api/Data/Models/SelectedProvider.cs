namespace tts_api.Data.Models
{
    public class SelectedProvider
    {
        public int Id { get; set; }
        public Provider Provider { get; set; }
        public int ProviderId { get; set; }
    }
}
