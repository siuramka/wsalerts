
namespace tts_api.Data.Models.DTO.Voice
{
    public class ProviderVoice
    {
        public ProviderVoice(Models.Voice voice)
        {
            Id = voice.Id;
            Name = voice.Name;
            DisplayName = voice.DisplayName;
            Selected = voice.Selected;
            ProviderName = voice.Provider.Name;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string? DisplayName { get; set; }
        public bool Selected { get; set; }
        public string ProviderName { get; set; }
    }
}
