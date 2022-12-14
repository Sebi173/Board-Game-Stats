import { Box, Divider, HamburgerIcon, Menu, Pressable } from 'native-base'

const TopMenu = () => {
    return (
        <Menu closeOnSelect={false} onOpen={() => console.log("opened")} onClose={() => console.log("closed")} trigger={triggerProps => {
            return <Pressable {...triggerProps}>
                    <HamburgerIcon />
                  </Pressable>;
            }}>
            <Menu.Group title="Profile">
                <Menu.Item>Menu item 1</Menu.Item>
                <Menu.Item>Menu item 2</Menu.Item>
            </Menu.Group>
            <Divider borderColor="gray.300" />
            <Menu.Group title="Help">
                <Menu.Item isDisabled>Menu item 3</Menu.Item>
                <Menu.Item>Menu item 4</Menu.Item>
            </Menu.Group>
        </Menu>
    )
}

export default TopMenu;