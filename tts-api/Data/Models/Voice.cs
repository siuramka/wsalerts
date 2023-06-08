using tts_api.Data.Models.DTO;
using tts_api.Data.Models.DTO.Voice;

namespace tts_api.Data.Models
{
    public class Voice
    {
        public Voice() { }
        public Voice(ProviderVoiceInsert voiceInsert)
        {
            this.Name = voiceInsert.ApiVoiceName;
            this.DisplayName = voiceInsert.DisplayName;
            this.Selected = voiceInsert.SelectedVoice;
        }
        public Voice(VoiceInsert voiceInsert)
        {
            this.ProviderId = voiceInsert.ProviderId;
            this.Name = voiceInsert.Name;
            this.DisplayName = voiceInsert.DisplayName;
            this.Selected = voiceInsert.Selected;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string? DisplayName { get; set; }
        public bool Selected { get; set; }
        public Provider Provider { get; set; }
        public int ProviderId { get; set; }
    }
}
