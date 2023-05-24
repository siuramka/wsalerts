namespace tts_api.Data.Models.Accounts;

using System.ComponentModel.DataAnnotations;

public class AuthenticateRequest
{
    [Required]
    public string? AccessToken { get; set; }
}