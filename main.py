import asyncio
import discord
from Token import token
from discord.ext import commands
import random
import os
import json
from discord.ext.commands.errors import MissingPermissions
intents = discord.Intents.all()
bot = commands.Bot(command_prefix="!", intents=intents, application_id='')#Coloque o seu id aqui!.
bot.remove_command("help")
@bot.event
async def on_ready():
    game = discord.Game('Sendo desenvolvido, por seven.xit#9342')
    await bot.change_presence(status=discord.Status.do_not_disturb, activity=game)
    print('Estou pronto')
    print(f"Meu perfil é {bot.user}")
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("Lhe falta poder")
async def load_extension():
    for filename in os.listdir("cogs"):
        if filename.endswith(".py"):
            await bot.load_extension(f"cogs.{filename[:-3]}")
    for filename in os.listdir("eco"):
        if filename.endswith(".py"):
            await bot.load_extension(f'eco.{filename[:-3]}')
async def main():
    await load_extension()
    await bot.start(token)
asyncio.run(main())
