namespace tts_api.Data.Models.DTO.Providers
{
    public class SelectedProviderResponse
    {
        public SelectedProviderResponse(SelectedProvider provider) {
            Id = provider.Id;
            Name = provider.Provider.Name;
        }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
