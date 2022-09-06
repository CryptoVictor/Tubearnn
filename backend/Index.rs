use std::mem::size_of;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_lang::solana_program::program_error::ProgramError;

declare_id!("DHBTg3qqcj3Hr1rWDp8SmQKV1d6E8YH4DGzFfdjmP23A");

#[program]
pub mod reward {
    
    use super::*;
    
    pub fn create_account(ctx: Context<CreateAccount>) -> ProgramResult {
        
        let user = &mut ctx.accounts.user;
        user.wallet_address = ctx.accounts.authority.key();
        user.tokens = 0_i32;
        msg!("Account Registered");
        Ok(())
    }
    
    pub fn add_tokens(ctx: Context<BalanceTokens>, tokens: i32) -> ProgramResult {
        
        let bal = &mut ctx.accounts.tokens;
        bal.tokens = bal.tokens + tokens;
        Ok(())
    }
    
    pub fn withdraw_tokens(ctx: Context<BalanceTokens>, system_account_: &'static AccountInfo, user_account_: &'static AccountInfo, tokens: i32) -> ProgramResult {
        
        let bal = &mut ctx.accounts.tokens;
        
        if (bal.tokens - tokens) < 0 {
            
            return Err(ProgramError::InsufficientFunds);
        }
        
        let rent_exemption = Rent::get()?.minimum_balance(system_account_.data_len());

        if **system_account_.lamports.borrow() - rent_exemption < tokens {
            
            msg!("Insufficient balance in our account");
            return Err(ProgramError::InsufficientFunds);
        }
    
        **system_account_.try_borrow_mut_lamports()? -= tokens;
        **user_account_.try_borrow_mut_lamports()? += tokens;
        
        bal.tokens = bal.tokens - tokens;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAccount<'info> {
    
    #[account(
            init, 
            seeds = [b"user".as_ref(),authority.key().as_ref()],
            bump,
            payer = authority, 
            space = size_of::<TokenAccount>() + 64,
            )]
    
    pub user: Account<'info, TokenAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: UncheckedAccount<'info>, 
}

#[account]
pub struct TokenAccount {
    
    pub wallet_address: Pubkey,
    pub tokens: i32,
}

#[derive(Accounts)]
pub struct BalanceTokens<'info> {
    
   #[account(
            init, 
            seeds = [b"tokens".as_ref(),authority.key().as_ref()],
            bump,
            payer = authority, 
            space = size_of::<TokenAccount>() + 64,
            )]
    
    pub tokens: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: UncheckedAccount<'info>,
}