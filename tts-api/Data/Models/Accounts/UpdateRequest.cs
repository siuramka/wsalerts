namespace tts_api.Data.Models.Accounts;

using System.ComponentModel.DataAnnotations;

public class UpdateRequest
{
    [Required]
    public string? Name { get; set; }

    public string? ExtraInfo { get; set; }
}