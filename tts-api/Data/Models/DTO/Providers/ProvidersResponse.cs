namespace tts_api.Data.Models.DTO.Providers
{
    public class ProvidersResponse
    {
        public ProvidersResponse(Provider provider)
        {
            this.Id = provider.Id;
            this.Name = provider.Name;
        }
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
