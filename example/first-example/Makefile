FOO = bar

# This is the main target
cake: eggs sugar
	@echo ">>> ready to create cake"
	ls
	touch cake
	@echo ">>> have a chocolate $(FOO)!"

eggs:
	@echo ">>> creating first file dependency..."
	touch eggs

sugar:
	@echo ">>> creating second file dependency..."
	touch sugar
